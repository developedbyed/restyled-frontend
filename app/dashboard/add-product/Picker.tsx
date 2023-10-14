"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Paintbrush } from "lucide-react";

export function GradientPicker({
  background,
  className,
  children,
  setColor,
  pickerNumber,
}: {
  background: string;
  className?: string;
  children: React.ReactNode;
  pickerNumber: number;
  setColor: (color: string, index: number) => void;
}) {
  const solids = [
    "#E2E2E2",
    "#ff75c3",
    "#ffa647",
    "#ffe83f",
    "#9fff5b",
    "#70e2ff",
    "#cd93ff",
    "#09203f",
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[220px] justify-start text-left font-normal",
            !background && "text-muted-foreground",
            className
          )}
        >
          <div className="w-full flex items-center gap-2">
            <div className="truncate flex-1">
              {background ? background : "Pick a color"}
            </div>
            <div
              className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
              style={{ background }}
            ></div>

            <Paintbrush className="h-4 w-4" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Tabs className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger className="flex-1" value="solid">
              Solid
            </TabsTrigger>
          </TabsList>

          <TabsContent value="solid" className="flex flex-wrap gap-1 mt-0">
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                onClick={(e) => setColor(s, pickerNumber)}
                className="rounded-md h-6 w-6 cursor-pointer active:scale-105 my-2"
              />
            ))}
            {children}
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
