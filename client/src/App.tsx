import { useState } from "react";
import { ParseResult, parse } from "papaparse";

import { updateProducts, validateProducts } from "./state/routes";

import Layout from "./scenes/Layout";
import Button from "./components/Button";
import FlexContainer from "./components/FlexContainer";
import Upload from "./components/Upload";
import Validation from "./components/Validation";

export default function App() {
  const [file, setFile] = useState<File>();
  const [validation, setValidation] = useState<{ error: boolean, message: string }>();
  const [updateBtn, setUpdateBtn] = useState(true);
  const [data, setData] = useState<productUpdate[]>([]);
  const [updatedData, setUpdatedData] = useState<product[]>([]);

  const validate = () => {
    if (file) {
      parse(file, {
        header: true,
        complete: async function (result: ParseResult<Record<string, unknown>>) {
          const parsed = result.data.map((data) => {
            return {
              product_code: data.product_code as number,
              new_price: data.new_price as number
            }
          });
          setData(parsed);
          const fetch = await validateProducts(data);
          console.log(data);

          setValidation({
            error: fetch.data.error,
            message: fetch.data.message
          });

          if (!fetch.data.error) {
            setUpdateBtn(false);
          }
        }
      });
    } else {
      setValidation({
        error: true,
        message: 'Arquivo inválido.'
      });
    }
  }

  const update = async () => {
    const fetch = await updateProducts(data);

    setValidation({
      error: fetch.data.error,
      message: fetch.data.message
    });

    console.log(fetch.data);

    setUpdatedData(fetch.data.data);
    
    setFile(undefined);
    setUpdateBtn(true);
  };

  return (
    <>
      <Layout>
        <Upload onFileChange={(file: File) => {
          setUpdateBtn(true);
          setFile(file);
        }} accept=".csv" />
        <Validation message={validation?.message} error={validation?.error}>
          {
            updatedData.length > 0 &&
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome</th>
                  <th>Preço de custo</th>
                  <th>Preço de venda</th>
                </tr>
              </thead>
              <tbody>
                {
                  updatedData?.map((value: product, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{value.code}</td>
                        <td>{value.name}</td>
                        <td>{value.cost_price}</td>
                        <td>{value.sales_price}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          }
        </Validation>
        <FlexContainer gap="10px">
          <Button onClick={validate}>Validar</Button>
          <Button onClick={update} disabled={updateBtn}>Atualizar</Button>
        </FlexContainer>
      </Layout>
    </>
  );
}