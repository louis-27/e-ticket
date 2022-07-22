import { Nav } from "~/components/Nav";
import { SEO } from "~/components/SEO";
import { Table } from "~/components/Table";
import { prisma } from "~/lib/prisma";

export default function Dashboard({ participants }) {
  return (
    <>
      <SEO />

      <Nav />
      <Table data={participants} />
    </>
  );
}

export async function getServerSideProps(context) {
  const participants = await prisma.participant.findMany({
    include: {
      group: {
        select: {
          name: true,
          pic: true,
        },
      },
      checkIn: {
        select: {
          date: true,
        },
      },
    },
  });

  console.log(participants);
  const f = participants.map((e) =>
    !e.checkInId
      ? e
      : { ...e, checkIn: { ...e.checkIn, date: e.checkIn.date.toISOString() } }
  );

  return {
    props: { participants: f },
  };
}
