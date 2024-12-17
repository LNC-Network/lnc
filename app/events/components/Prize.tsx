"use client";
import { Event } from "@/types/event";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";

function cardStyle() {
  return "bg-gray-800 p-10 border border-black";
}

const Prize = ({ Prize }: { Prize: Event["Prize"] }) => {
  return (
    <>
      <div
        id="prize"
        className="max-w-7xl mx-auto flex flex-col justify-center items-center h-screen"
      >
        <h1 className="text-5xl font-bold tracking-widest">Prizes</h1>
        <div className="flex flex-wrap columns-3 space-x-5 justify-center items-center p-5">
          <Card className={cardStyle()}>
            <CardHeader>First</CardHeader>
            <CardContent>{Prize.first}</CardContent>
          </Card>
          <Card className={cardStyle()}>
            <CardHeader>Second</CardHeader>
            <CardContent>{Prize.second}</CardContent>
          </Card>
          <Card className={cardStyle()}>
            <CardHeader>Third</CardHeader>
            <CardContent>{Prize.third}</CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Prize;
