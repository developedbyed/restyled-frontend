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
  const mutedPalettes = [
    "#FDE3A7",
    "#F8D573",
    "#E3B44B",
    "#D1936B",
    "#AE7D5E",
    "#FFAA85",
    "#FF9052",
    "#FF784D",
    "#FF616D",
    "#FF4D7D",
    "#00B5EE",
    "#009FDA",
    "#0073B9",
    "#004E7C",
    "#002951",
    "#655D8A",
    "#50466F",
    "#3D385D",
    "#2B2947",
    "#181430",
    "#76C9BD",
    "#53BBB7",
    "#369DA3",
    "#247489",
    "#0D5C6C",
    "#C25700",
    "#FF6E00",
    "#FF8A00",
    "#FFA800",
    "#FFC702",
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
            {mutedPalettes.map((s) => (
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
