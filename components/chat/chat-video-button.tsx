"use client"

import qs from "query-string"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { Video, VideoOff } from "lucide-react"
import { ActionTooltip } from "../action-tooltip"

export const ChatVideoButton = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname() // Added missing pathname hook
    
    const isVideo = searchParams?.get("video")
    const Icon = isVideo ? VideoOff : Video; // Fixed: Use proper component assignment
    const tooltipLabel = isVideo ? "End video" : "Start video call"
    
    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname || "",
            query: {
                video: isVideo ? undefined : true,
            }
        }, { skipNull: true })
        
        
        router.push(url) // Added missing router navigation
    }
    
    return (
        <ActionTooltip side="bottom" label={tooltipLabel}>
            <button 
                onClick={onClick}
                className="hover:opacity-75 transition mr-4"
            >
                <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
            </button>
        </ActionTooltip>
    )
}