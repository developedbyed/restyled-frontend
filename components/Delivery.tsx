import { TbTruckDelivery } from "react-icons/tb";
import { GrReturn } from "react-icons/gr";

export default function Delivery() {
  return (
    <div className="max-w-xl bg-orange-100 p-8">
      <div>
        <span className="flex items-center gap-2">
          <TbTruckDelivery className="text-2xl" />
          <h3>Delivery</h3>
        </span>
        <p>
          Order now and get it by Tuesday 26th Sep Our products are made to
          order - Find out more
        </p>
      </div>
      <div>
        <span className="flex items-center gap-2">
          <GrReturn className="text-2xl" />
          <h3>Returns</h3>
        </span>

        <p>
          Due to the personalised nature of these products, we don’t typically
          accept returns. However, if you're not 100% happy with your order, get
          in touch within 30 days of your order date and we'll sort it.
        </p>
      </div>
      <div>
        <h3>Academic Year Diary</h3>
        <p>
          For students and teachers who like to put pen to paper, our hardback
          academic diary is here to organise your university or college days
          from Aug '23 to July '24. Find your flow with handy term timetables,
          deadline, finance & grade trackers, plus space for meal plans. The
          structured weekly pages are there to help you shine, not stress. See
          where this study companion takes you – your possibilities are endless.
        </p>
      </div>
    </div>
  );
}
