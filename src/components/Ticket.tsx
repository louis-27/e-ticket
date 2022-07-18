export function Ticket({ ticketDetails }) {
  return (
    <div className="border rounded shadow-md px-8 py-6 flex flex-col justify-center space-y-3 min-w-[16rem]">
      <h1 className="text-xl text-center font-bold">
        No. Peserta #{ticketDetails.id}
      </h1>
      <div className="font-medium">
        <p>Nama</p>
        <p className="text-gray-400">{ticketDetails.nama}</p>
        <p>NIM</p>
        <p className="text-gray-400">{ticketDetails.nim}</p>
        <p>Kelompok</p>
        <p className="text-gray-400">{ticketDetails.kelompok}</p>
        <p>PIC</p>
        <p className="text-gray-400">{ticketDetails.pic}</p>
      </div>
      <button className="py-2 bg-sky-500 text-white font-semibold rounded">
        Check In
      </button>
    </div>
  );
}
