import { Ticket } from "~/components/Ticket";

// export async function getServerSideProps() {}

export default function CheckInTicket() {
  const ticketDetails = {
    id: "22",
    nama: "Bryan Zheng",
    nim: "2440026602",
    kelompok: "Typhoon",
    pic: "Dimitri Markus",
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <Ticket ticketDetails={ticketDetails} />
    </div>
  );
}
