import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="">
        <h1>Invoice App</h1>
        <button className={buttonVariants({ variant: "destructive" })}>
          Invoice App
        </button>
      </div>
    </>
  );
}
