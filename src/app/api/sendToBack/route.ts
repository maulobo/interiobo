import { connectDB } from "@/lib/mongodb";
import UserMinimal from "@/models/user"; // Asegúrate de importar el modelo correcto
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const req = await request.json();
    console.log(req);

    if (req.body && req.body.user) {
      const { name, email } = req.body.user;

      await connectDB();

      const userFound = await UserMinimal.findOne({ email });

      if (userFound)
        return NextResponse.json({
          message: "Email already exists",
          tokens: userFound.tokens,
        });

      // Utiliza el modelo UserMinimal en lugar de User
      const userCreated = new UserMinimal({
        name,
        email,
        tokens: 10,
      });

      const savedUser = await userCreated.save();
      console.log("guardado es...", savedUser);
      return NextResponse.json(
        {
          email,
          tokens: savedUser.tokens,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({
    message: "Recibido campeon",
  });
}

export async function PUT(request: Request) {
  try {
    const req = await request.json();
    const { email } = req.body.user;

    await connectDB();

    const userFound = await UserMinimal.findOne({ email });
    console.log(userFound);

    if (userFound) {
      console.log("restando");
      userFound.tokens -= 1;
      await userFound.save();

      return NextResponse.json({
        tokens: userFound.tokens,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
