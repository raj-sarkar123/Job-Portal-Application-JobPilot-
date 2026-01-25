import supabaseClient from "@/utils/supabase";

export async function getCompanies(token) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from("companies").select("*");

  if (error) {
    console.error("Error fetching Companies:", error);
    return null;
  }

  return data;
}


export async function addNewCompany(token, _, companyData) {
  const supabase = await supabaseClient(token);

  // ✅ Correct file check
  if (!(companyData.logo instanceof File)) {
    console.error("Logo is not a File object", companyData.logo);
    return null;
  }

  // ✅ Get file extension from logo
  const fileExt = companyData.logo.name.split(".").pop();

  // ✅ Safe filename
  const fileName = `logo-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${fileExt}`;

  // ✅ Upload image
  const { error: storageError } = await supabase.storage
    .from("company-logo")
    .upload(fileName, companyData.logo, {
      contentType: companyData.logo.type, // image/png, image/jpeg
      upsert: false,
    });

  if (storageError) {
    console.error("Upload error:", storageError);
    return null;
  }

  // ✅ Get public URL
  const { data: publicUrlData } = supabase.storage
    .from("company-logo")
    .getPublicUrl(fileName);

  const logo = publicUrlData.publicUrl;

  // ✅ Insert into DB
  const { data, error } = await supabase
    .from("companies")
    .insert([
      {
        name: companyData.name,
        logo,
      },
    ])
    .select();

  if (error) {
    console.error("Error inserting company:", error);
    return null;
  }

  return data;
}
