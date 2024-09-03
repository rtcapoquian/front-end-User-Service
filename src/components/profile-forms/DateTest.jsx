import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

function CalendarForm({ date, onDateChange }) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <Button
           onClick={(e) => e.preventDefault()} 
            variant="outline"
            className="w-[240px] pl-3 text-left font-normal bg-background text-foreground border border-foreground"
          >
            {date ? format(date, "PPP") : "Pick a date"}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50 text-foreground" />
          </Button>
        </div>
       
      </div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={(selectedDate) => {
          if (selectedDate) {
            onDateChange(selectedDate);
          }
        }}
        initialFocus
        className="bg-card text-foreground"
      />
    </div>
  );
}

export default CalendarForm;
