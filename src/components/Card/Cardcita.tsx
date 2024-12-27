import { Card, CardBody, Image, Divider, CardFooter } from "@nextui-org/react";

import LogoAni from "../../../public/img/logoani.svg";
import { CardcitaProps } from "../../interface";
import { textoMotivacional } from "../helper/index";
import "../../styles/globals.css";
export default function Cardcita(props: CardcitaProps) {
  const { nombre, cc, cargo, ubicacion, chaqueta, camisa } = props;

  return (
    <Card
      isBlurred
      className="border-solid border-2 border-sky-500 dark:bg-default-100/50 w-[710px] mb-4"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center ">
          <div className="relative col-span-6 md:col-span-4 justify-center flex ">
            <Image
              alt="Album cover"
              className="object-cover text-center  "
              height={195}
              src={LogoAni}
              shadow="lg"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <h4 className="font-bold text-large text-center mb-1  ">
              Funcionario
            </h4>
            <Divider />
            <div className="flex justify-between items-start mb-1 snap-none">
              <b>Nombre y Apellidos:</b>
              <p className="text-default-500  text-left">{nombre}</p>
            </div>

            <div className="flex justify-between   ">
              <b>C.C:</b>
              <p className="text-default-500">{cc}</p>
            </div>

            <div className="flex justify-between   mb-1">
              <b>Ubicación:</b>
              <p className="text-default-500">{ubicacion}</p>
            </div>
            <div className="flex justify-between   ">
              <b>Cargo:</b>
              <p className="text-default-500">{cargo}</p>
            </div>
            <Divider />
            <div className="space-y-1 mb-1 text-center">
              <b>Tallas</b>
            </div>
            <div className="flex h-1  space-x-2 text-small justify-between ">
              <div className="text-center ">
                Chaqueta Rompevientos: {chaqueta}
              </div>
              <div className="text-left ">Gorra: T.U</div>
              <Divider orientation="vertical" />
              <div className="text-left ">Camiseta Polo: {camisa}</div>
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <div className=" text-center   ">
          <p className="text-small text-default-700">{textoMotivacional}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
