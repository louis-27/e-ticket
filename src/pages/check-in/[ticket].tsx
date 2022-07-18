import { SEO } from "~/components/SEO";
import { Ticket } from "~/components/Ticket";

export async function getServerSideProps(context) {
  const { ticket } = context.params.ticket;
  const isBase64 =
    /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;

  // if ticket not base64 return fail
  if (!isBase64.test(ticket)) return { props: { success: false } };
  // if ticket not valid json return fail
  // if ticket not valid urlticket object return fail

  return {
    props: {
      success: true,
      ticketDetails: ticket,
    },
  };
}

export default function CheckInTicket() {
  const ticketDetails = {
    id: "22",
    nama: "Bryan Zheng",
    nim: "2440026602",
    kelompok: "Typhoon",
    pic: "Dimitri Markus",
  };

  return (
    <>
      <SEO />

      <div className="h-screen flex justify-center items-center">
        <Ticket ticketDetails={ticketDetails} />
      </div>
    </>
  );
}
