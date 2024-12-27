import { useState } from "react";
import * as XLSX from "xlsx";
import DefaultLayout from "@/layouts/default";
import Cardcita from "@/components/Card/Cardcita";
import { Button, Input } from "@nextui-org/react";
import "../styles/style.css";

export default function IndexPage() {
  const [data, setData] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const binaryStr = evt.target?.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setData(jsonData);
      };
      reader.readAsBinaryString(file);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-2">
          <div className="inline-block max-w-lg text-center justify-center no-print">
            <div className="justify-center mb-4">
              {data.length > 0 ? (
                <Button color="primary" variant="ghost" onClick={handlePrint}>
                  Imprimir
                </Button>
              ) : (
                <Input
                  type="file"
                  label="Excel"
                  accept=".xlsx, .xls"
                  onChange={handleFileUpload}
                />
              )}
            </div>
          </div>
          <div className="grid justify-center mb-4 printable-content">
            {data.map((item, index) => (
              <Cardcita
                key={index}
                nombre={item.NOMBRE}
                cc={item.CC}
                cargo={item.CARGO}
                ubicacion={item.UBICACION}
                chaqueta={item.CHAQUETA}
                camisa={item.CAMISA}
              />
            ))}
          </div>
        </section>
      </DefaultLayout>
    </>
  );
}
