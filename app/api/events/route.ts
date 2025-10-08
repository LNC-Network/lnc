import { supabase } from "@/utils/supabase/client";

export async function GET() {
  try {
    const { data, error } = await supabase.from("events").select("*");
    if (error) {
      throw new Error(error?.message);
    }
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(
      "Unexpected error during fetching events please contact-`jit.nathdeb@gmail.com`",
      { status: 500 },
    );
  }
}
