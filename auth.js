/* =========================================================
   EVAN'S SMART FIX - SHARED CUSTOMER AUTH
   Supabase email/password authentication
========================================================= */

(function () {
    "use strict";

    const SUPABASE_URL = "https://tblqoawewcyomwgjahry.supabase.co";
    const SUPABASE_KEY = "sb_publishable_dWJV8sw3Wis--2ZIuQ_Ypg_hI9yhTMW";

    let clientPromise = null;

    function loadSupabaseLibrary() {
        if (window.supabase && typeof window.supabase.createClient === "function") {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const existing = document.querySelector('script[data-esf-supabase-loader="true"]');

            if (existing) {
                existing.addEventListener("load", resolve, { once: true });
                existing.addEventListener("error", reject, { once: true });
                return;
            }

            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
            script.async = true;
            script.dataset.esfSupabaseLoader = "true";
            script.onload = resolve;
            script.onerror = () => reject(new Error("Could not load Supabase."));
            document.head.appendChild(script);
        });
    }

    async function getClient() {
        if (window.esfSupabaseClient) {
            return window.esfSupabaseClient;
        }

        if (!clientPromise) {
            clientPromise = (async () => {
                await loadSupabaseLibrary();

                window.esfSupabaseClient = window.supabase.createClient(
                    SUPABASE_URL,
                    SUPABASE_KEY,
                    {
                        auth: {
                            persistSession: true,
                            autoRefreshToken: true,
                            detectSessionInUrl: true
                        }
                    }
                );

                return window.esfSupabaseClient;
            })();
        }

        return clientPromise;
    }

    async function getSession() {
        const client = await getClient();
        const { data, error } = await client.auth.getSession();

        if (error) {
            throw error;
        }

        return data.session || null;
    }

    async function getUser() {
        const client = await getClient();
        const { data, error } = await client.auth.getUser();

        if (error) {
            return null;
        }

        return data.user || null;
    }

    function safeNext(defaultPage) {
        const params = new URLSearchParams(window.location.search);
        const raw = params.get("next");

        if (!raw) {
            return defaultPage || "account.html";
        }

        // Only allow local HTML pages on this site.
        if (/^[a-z0-9_-]+\.html(?:\?.*)?$/i.test(raw)) {
            return raw;
        }

        return defaultPage || "account.html";
    }

    window.ESFAuth = {
        getClient,
        getSession,
        getUser,
        safeNext,
        supabaseUrl: SUPABASE_URL
    };
})();
