import { BottomWar } from "../components/BottomWar";
import { ButtonC } from "../components/ButtonC";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubH } from "../components/SubH";

export default function SignUp() {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="SignUp" />
          <SubH label="Enter your details to create an account" />
          <InputBox title="First Name" placeholder="John" /> {/* Fixed typo */}
          <InputBox title="Last Name" placeholder="Doe" />
          <InputBox title="User Name" placeholder="" />
          <InputBox title="Password" placeholder="********" />
          <ButtonC label="Submit" />
          {/* Uncomment if needed */}
          {/* <BottomWar label="Already have an account?" to="/signup" buttonName="SignIn" /> */}
        </div>       
      </div>
    </div>
  );
}
