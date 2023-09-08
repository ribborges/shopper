import { useState } from "react";
import { ParseResult, parse } from "papaparse";

import { getProducts, updateProducts } from "./state/routes";

import Layout from "./scenes/Layout";
import Button from "./components/Button";
import FlexContainer from "./components/FlexContainer";
import Upload from "./components/Upload";
import Validation from "./components/Validation";

export default function App() {
  const [file, setFile] = useState<File>();

  const [validation, setValidation] = useState<{ error: boolean, message: string }>();

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
          console.log(parsed);

          const fetch = await updateProducts(parsed);

          setValidation({
            error: false,
            message: fetch.data
          });
        }
      });
    } else {
      setValidation({
        error: true,
        message: 'Arquivo inválido.'
      });
    }
  }

  const teste = async () => {
    const fetch = (await getProducts()).data;

    setValidation({
      error: true,
      message: JSON.stringify(fetch)
    });
  }

  return (
    <>
      <Layout>
        <Upload onFileChange={(file: File) => setFile(file)} accept=".csv" />
        <Validation message={validation?.message} error={validation?.error} />
        <FlexContainer gap="10px">
          <Button onClick={validate}>Validar</Button>
          <Button disabled={true}>Atualizar</Button>
        </FlexContainer>
      </Layout>
    </>
  );
}