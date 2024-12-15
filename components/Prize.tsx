"use client";
import {Event} from "@/types/event";
import {Card, CardContent, CardHeader} from "./ui/card";

function cardStyle() {
    return "bg-gray-800 p-10 border border-black";
}

const Prize = ({Prize}: { Prize: Event["Prize"] }) => {
    return (
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
    );
};

export default Prize;
