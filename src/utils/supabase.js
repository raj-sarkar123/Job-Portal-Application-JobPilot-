import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// single global client (no auth, no gotrue)
let client;

const supabaseClient = (accessToken) => {
  if (client) return client;

  client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,   // 🔥 disable auth
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {},
    },
  });

  return client;
};

export default supabaseClient;



// import { createClient } from "@supabase/supabase-js";

// export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// // 🔒 cache clients by token (and survive HMR)
// if (!globalThis.__supabaseClients) {
//   globalThis.__supabaseClients = {};
// }

// const supabaseClient = (supabaseAccessToken) => {
//   // fallback key if token is undefined/null
//   const key = supabaseAccessToken || "__public__";

//   // ✅ reuse existing client
//   if (globalThis.__supabaseClients[key]) {
//     return globalThis.__supabaseClients[key];
//   }

//   // ✅ create ONCE per token
//   const client = createClient(supabaseUrl, supabaseAnonKey, {
//     global: {
//       headers: supabaseAccessToken
//         ? { Authorization: `Bearer ${supabaseAccessToken}` }
//         : {},
//     },
//   });

//   globalThis.__supabaseClients[key] = client;
//   return client;
// };

// export default supabaseClient;














// import { createClient } from "@supabase/supabase-js";

// export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// const supabaseClient = (supabaseAccessToken) => {
//   return createClient(supabaseUrl, supabaseAnonKey, {
//     global: {
//       headers: {
//         Authorization: `Bearer ${supabaseAccessToken}`,
//       },
//     },
//   });
// };

// export default supabaseClient;
