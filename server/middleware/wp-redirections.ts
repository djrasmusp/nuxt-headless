import type {WPRedirection, WPRedirections} from "~/types";

export default defineEventHandler(async (event) => {
    const { WP_USER, WP_APP_PASS, public: { WP_URL, BASE_URL } } = useRuntimeConfig()

    if(!WP_USER || !WP_APP_PASS) {
        return
    }

    const basicAuth = `${WP_USER}:${WP_APP_PASS}`
    const pathnameWithOutTrailingSlash = event.path

    try {
        const {items: redirects, total} : WPRedirections = await $fetch(`${WP_URL}/wp-json/redirection/v1/redirect/?filterBy%5Burl-match%5D=plain&filterBy%5Burl%5D=${pathnameWithOutTrailingSlash}`, {
            headers: {
                Authorization: `Basic ${Buffer.from(basicAuth).toString("base64")}`,
                "Content-Type": "application/json",
            },
        })

        // check if no redirect exitst
        if(total === 0) {
            console.log('no redirects found')
            return
        }

        const redirect = redirects.find(
            (item: WPRedirection) => item.url === pathnameWithOutTrailingSlash
        )

        // check if no redirect exist equal path
        if(!redirect) {
            console.log('no redirect found')
            return
        }

        // check if redirect is enabled on path
        if(!redirect.enabled){
            return
        }

        const redirectUrl = new URL(
            redirect.action_data.url,
            BASE_URL
        ).toString()

        sendRedirect(event, redirectUrl, redirect.action_code === 301 ? 308 : 307)


    }catch (error: unknown) {
        console.error(error)
        return
    }

})