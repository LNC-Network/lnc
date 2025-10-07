import { supabase } from "@/utils/supabase/server";
import { z } from "zod";

const schema = z.object({
  email: z.email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return new Response(JSON.stringify(result.error), { status: 400 });
    }

    const { email } = result.data;

    const { error } = await supabase.from("email").insert([{ email }]);
    if (error) throw new Error(error?.message);

    return new Response("Subscription successful", { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Unexpected error", { status: 500 });
  }
}
