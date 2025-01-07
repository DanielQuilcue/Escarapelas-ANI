import { useState } from "react";
import * as XLSX from "xlsx";
import DefaultLayout from "@/layouts/default";
import Cardcita from "@/components/Card/Cardcita";
import { Button, Input } from "@nextui-org/react";
import { CardcitaProps } from "../interface";
import "../styles/style.css";
export default function IndexPage() {
  const [data, setData] = useState<CardcitaProps[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const binaryStr = evt.target?.result;
        try {
          const workbook = XLSX.read(binaryStr, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData: CardcitaProps[] = XLSX.utils.sheet_to_json(sheet);
          setData(jsonData);
        } catch (error) {
          console.error("Error reading Excel file:", error);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-2">
        <div className="inline-block max-w-lg text-center justify-center no-print">
          <div className="justify-center mb-4">
            {data.length > 0 ? (
              <>
                <Button color="primary" variant="ghost" onClick={handlePrint}>
                  Imprimir
                </Button>
                <p>Total de escarapelas: {data.length}</p>
              </>
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
        <div className="printable-content">
          {data.map((item, index) => (
            <div key={index} className="card-container">
              <Cardcita
                nombre={item.NOMBRE}
                cc={item.CC}
                cargo={item.CARGO}
                ubicacion={item.UBICACION}
                chaqueta={item.CHAQUETA}
                camisa={item.CAMISA}
              />
              {index % 2 === 1 && <div className="page-break"></div>}
            </div>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}
