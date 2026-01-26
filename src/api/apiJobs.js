import supabaseClient from "@/utils/supabase";

/* ---------- GET JOBS ---------- */
// export async function getJobs(
//   token,
//   { location, company_id, searchQuery } = {}
// ) {
//   const supabase = supabaseClient(token);

//   let query = supabase
//     .from("jobs")
//     .select(`
//       *,
//       company:companies!inner (
//         name,
//         logo
//       ),
//       saved:saved_jobs!left (
//         id
//       )
//     `);

//   if (searchQuery?.trim()) {
//     query = query.ilike("title", `%${searchQuery}%`);
//   }

//   if (location?.trim()) {
//     query = query.ilike("location", `%${location}%`);
//   }

//   if (company_id?.trim()) {
//     query = query.ilike("company.name", `%${company_id}%`);
//   }

//   const { data, error } = await query;

//   if (error) {
//     console.error("Supabase getJobs error:", error);
//     throw error;
//   }

//   return data;
// }
export async function getJobs(
  token,
  { location, company_id, searchQuery } = {}
) {
  const supabase = supabaseClient(token);

  let query = supabase
    .from("jobs")
    .select(`
      *,
      company:companies!inner (
        name,
        logo
      ),
      saved:saved_jobs!left (
        id
      )
    `);

  if (searchQuery?.trim()) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  if (location?.trim()) {
    query = query.ilike("location", `%${location}%`);
  }

  if (company_id?.trim()) {
    query = query.ilike("company.name", `%${company_id}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Supabase getJobs error:", error);
    throw error;
  }

  return data ?? [];
}




/* ---------- SAVE / UNSAVE (FIXED SIGNATURE) ---------- */
export async function saveJob(token, _options, job_id) {
  const supabase = supabaseClient(token);

  const { error } = await supabase
    .from("saved_jobs")
    .insert({ job_id });

  if (error) throw error;
}

export async function unsaveJob(token, _options, job_id) {
  const supabase = supabaseClient(token);

  const { error } = await supabase
    .from("saved_jobs")
    .delete()
    .eq("job_id", job_id);

  if (error) throw error;
}

//For single jobs(Applications)

export async function getSingleJob(token, job_id) {
  const supabase = supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select("*, company:companies(name,logo), applications:applications(*)")
    .eq("id", job_id)   // ✅ filter FIRST
    .single();          // ✅ single LAST

  if (error) throw error;
  return data;
}



export async function updateHiringStatus(token, {job_id},isOpen) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .update({isOpen})
    .eq("id", job_id)   
    .select();         

  if (error) throw error;
  return data;
}


export async function addNewJob(token,_,jobData) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();         

  if (error) throw error;
  return data;
}



export async function getSavedJobs(token) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("saved_jobs")
    
    .select("*,job:jobs(*,company:companies(name,logo))");         

  if (error) throw error;
  return data;
}



// export async function getMyJobs(token, { recruiter_id }) {
  

//   const supabase = await supabaseClient(token);

//   const { data, error } = await supabase
//     .from("jobs")
//     .select("*");

//   console.log("ALL JOBS:", data);

//   if (error) {
//     console.error(error);
//     return [];
//   }

//   return data;
// }


export async function getMyJobs(token) {
  const supabase = supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select(`
      *,
      company:companies (
        name,
        logo
      )
    `);

  

  if (error) throw error;
  return data;
}





export async function deleteJob(token, _, { job_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id);

  if (error) {
    console.error("Error deleting job:", error);
    throw error;
  }

  return data;
}



// // - post job
// export async function addNewJob(token, _, jobData) {
//   const supabase = await supabaseClient(token);

//   const { data, error } = await supabase
//     .from("jobs")
//     .insert([jobData])
//     .select();

//   if (error) {
//     console.error(error);
//     throw new Error("Error Creating Job");
//   }

//   return data;
// }


