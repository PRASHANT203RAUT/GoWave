import { useSocket } from "@/components/providers/socket-provider";
import { Member, Message, Profile } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

// Types
type ChatSocketProps = {
  addKey: string;
  updateKey: string;
  queryKey: string;
};

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

type Page = {
  items: MessageWithMemberWithProfile[];
};

type PaginatedMessages = {
  pages: Page[];
  pageParams: any[];
};

// Hook
export const useChatSocket = ({
  addKey,
  updateKey,
  queryKey,
}: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    // 🔁 Update Message (e.g. edits)
    socket.on(updateKey, (message: MessageWithMemberWithProfile) => {
      queryClient.setQueryData<PaginatedMessages>([queryKey], (oldData) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }

        const updatedPages = oldData.pages.map((page) => ({
          ...page,
          items: page.items.map((item) =>
            item.id === message.id ? message : item
          ),
        }));

        return {
          ...oldData,
          pages: updatedPages,
        };
      });
    });

    // ➕ Add New Message
    socket.on(addKey, (message: MessageWithMemberWithProfile) => {
      queryClient.setQueryData<PaginatedMessages>([queryKey], (oldData) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                items: [message],
              },
            ],
            pageParams: [],
          };
        }

        const firstPage = oldData.pages[0] ?? { items: [] };
        const updatedFirstPage = {
          ...firstPage,
          items: [message, ...(firstPage.items || [])],
        };

        return {
          ...oldData,
          pages: [updatedFirstPage, ...oldData.pages.slice(1)],
        };
      });
    });

    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    };
  }, [socket, queryClient, addKey, updateKey, queryKey]);
};
