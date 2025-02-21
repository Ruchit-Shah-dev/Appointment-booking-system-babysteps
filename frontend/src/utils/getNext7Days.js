import { format, addDays } from "date-fns";

const getNext7Days = () => {
  return Array.from({ length: 7 }, (_, i) => format(addDays(new Date(), i), "yyyy-MM-dd"));
};

export default getNext7Days;
