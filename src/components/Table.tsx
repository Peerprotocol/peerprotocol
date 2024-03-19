const Table = ({
  children,
  tableLabels,
  extraColumms = 0,
}: {
  children: React.ReactNode;
  tableLabels: string[];
  extraColumms?: number;
}) => {
  return (
    <table className="table-auto min-w-full">
      <thead className="border-b border-white">
        <tr className="[&>th]:text-start [&>th]:py-6 [&>th]:font-normal">
          {tableLabels.map((label, index) => (
            <th key={index}>{label}</th>
          ))}
          {Array(extraColumms)
            .fill(null)
            .map((_, index) => (
              <th key={index}></th>
            ))}
        </tr>
      </thead>
      <tbody className="relative translate-y-4">{children}</tbody>
    </table>
  );
};

export default Table;
