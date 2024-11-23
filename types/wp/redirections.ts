
export interface WPRedirections {
    items: WPRedirection[],
    total: number
}

export type WPRedirection = {
    id: number
    url: string
    match_url: string
    match_data: object
    macth_type: string
    action_type: string
    action_code: 301 | 302 | 303 | 304 | 307 | 308
    action_data: {
        url: string
    }
    title: string
    hits: number
    regex: string | boolean
    group_id: number
    position: number
    last_access: string
    enabled: boolean


}