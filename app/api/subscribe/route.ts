import { supabase } from "@/utils/supabase/client";
import { z } from "zod";

const schema = z.object({
  email: z.email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return new Response(
        "The requested body has invalid data such as missing or invalid email",
        { status: 400 },
      );
    }

    const { email } = result.data;
    const { error } = await supabase.from("email").insert([{ email }]);
    if (error) throw new Error(error?.message);

    return new Response("Subscription successful", { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(
      "Unexpected error please contact-`jit.nathdeb@gmail.com`",
      { status: 500 },
    );
  }
}
