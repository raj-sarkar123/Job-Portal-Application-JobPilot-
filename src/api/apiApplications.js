// import supabaseClient, { supabaseUrl } from "@/utils/supabase";

// export async function applyToJob(token, _, jobData) {
//   const supabase = await supabaseClient(token);
//   const random = Math.floor(Math.random() * 90000);
//   const fileName = `resume-${random}-${jobData.candidate_id}`;

//   const { error: storageError } = await supabase.storage
//     .from("resumes")
//     .upload(fileName, jobData.resume);

//   if (storageError) {
//     console.log("Error Uploading resume", error);
//     return null;
//   }

//   const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

//   const { data, error } = await supabase
//     .from("applications")
//     .insert([
//       {
//         ...jobData,
//         resume,
//       },
//     ])
//     .select();

//   if (error) {
//     console.log("Error submitting applications", error);
//     return null;
//   }

//   return data;
// }


// export async function updateApplicationsStatus(token,{job_id},status) {
//   const supabase = await supabaseClient(token);

//   const {data, error} = await supabase
//   .from("applications")
//   .update({status})
//   .eq("job_id",job_id)
//   .select();

//   if(err || data.length===0){
//     console.log("Error updating application status",error);
//     return null;
//   }
//   return data;
// }










import supabaseClient from "@/utils/supabase";

/* ======================================================
   APPLY TO JOB (UPLOAD RESUME + SAVE CORRECT PUBLIC URL)
====================================================== */
export async function applyToJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  if (!(jobData.resume instanceof File)) {
    console.error("Resume is not a File object", jobData.resume);
    return null;
  }

  const fileExt = jobData.resume.name.split(".").pop();
  const fileName = `resume-${Date.now()}-${jobData.candidate_id}.${fileExt}`;

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume, {
      contentType: "application/pdf",
      upsert: false,
    });

  if (storageError) {
    console.error("Upload error:", storageError);
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from("resumes")
    .getPublicUrl(fileName);

  const resume = publicUrlData.publicUrl;

  const { data, error } = await supabase
    .from("applications")
    .insert([{ ...jobData, resume }])
    .select();

  if (error) {
    console.error("DB insert error:", error);
    return null;
  }

  return data;
}

/* ======================================================
   UPDATE APPLICATION STATUS (FIXED)
====================================================== */
export async function updateApplicationsStatus(token, { job_id }, status) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("job_id", job_id)
    .select();

  if (error || !data || data.length === 0) {
    console.error("Error updating application status:", error);
    return null;
  }

  return data;
}



export async function getApplications(token,{user_id}) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("applications")
    
   
    .select("*,job:jobs(title,company:companies(name,logo))")
    .eq("candidate_id", user_id);

  if (error) {
    console.error("Error getting application status:", error);
    return null;
  }

  return data;
}


