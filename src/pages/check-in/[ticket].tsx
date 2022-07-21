import { SEO } from "~/components/SEO";
import { Ticket } from "~/components/Ticket";

export async function getServerSideProps(context) {
  const isBase64 =
    /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  let { ticket } = context.params;

  // if ticket not base64 return fail
  if (!isBase64.test(ticket)) return { props: { success: false } };

  // if ticket not valid json return fail
  const decodedTicket = atob(ticket);
  let ticketObj;
  try {
    ticketObj = JSON.parse(decodedTicket);
  } catch (e) {
    return { props: { success: false } };
  }

  // if ticket not valid urlticket object return fail
  if (!(ticketObj.hasOwnProperty("id") && ticketObj.hasOwnProperty("nim"))) {
    return { props: { success: false } };
  }

  const tickets = [
    {
      id: 22,
      nama: "Bryan Zheng",
      nim: 2440026602,
      kelompok: "Typhoon",
      pic: "Dimitri Markus",
    },
  ];
  // if ticket id || nim invalid return fail
  let foundTicket = tickets.filter(
    (ticket) => ticket.id === ticketObj.id && ticket.nim === ticketObj.nim
  );
  if (foundTicket.length === 0) return { props: { success: false } };

  return {
    props: {
      success: true,
      ticketDetails: foundTicket[0],
    },
  };
}

export default function CheckInTicket({ success, ticketDetails }) {
  return (
    <>
      <SEO />

      <div className="h-screen flex justify-center items-center">
        <Ticket ticketDetails={ticketDetails} />
      </div>
    </>
  );
}
