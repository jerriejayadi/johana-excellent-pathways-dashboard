import Image from "next/image";
import { BiChevronRight } from "react-icons/bi";
import Chip from "../Chip";
import { toTitleCase, translateColorChips } from "@/utils";

interface UsersCard {
  fullname: string;
  gender: string;
  className?: string;
  status: "active" | "inactive";
  onClick: () => void;
}

export default function UsersCard({
  fullname,
  gender,
  className,
  status,
  onClick,
}: UsersCard) {
  return (
    <div
      onClick={onClick}
      className={`${
        className ?? ""
      } rounded-lg dark:bg-dark-surface p-4 flex items-center justify-between gap-3`}
    >
      <div className={`flex items-center gap-3 shrink-0`}>
        <Image
          alt={``}
          src={gender === "male" ? `/icons/male.png` : `/icons/female.png`}
          className={`size-14 shrink-0`}
          width={1000}
          height={1000}
        />
        <div>
          <p>{fullname}</p>
          <Chip color={translateColorChips(status) as any} className={`mt-2`}>
            {toTitleCase(status)}
          </Chip>
        </div>
      </div>
      <div className={`shrink-0`}>
        <BiChevronRight className={`size-8`} />
      </div>
    </div>
  );
}
