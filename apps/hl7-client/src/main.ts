/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

// import express from 'express';
// import * as path from 'path';
import { Client, Message, Batch } from 'node-hl7-client';
import { HL7_2_3_1 } from  'node-hl7-client/lib/types/specification/2.3.1';
const hl7 = [
  'MSH|^~\\&|BC-5380|Mindray|||20080617143943||ORU^R01|1|P|2.3.1||||||UNICODE',
  'PID|1||7393670^^^^MR||Joan^JIang||19900804000000|Female',
  'PV1|1||nk^^001',
  'OBR|1||20071207011|00001^Automated Count^99MRC||20080508140600|20080508150616|||John||||20080508150000||||||||||HM||||||||Mindray',
  'OBX|1|IS|08001^Take Mode^99MRC||O||||||F',
  'OBX|2|IS|08002^Blood Mode^99MRC||W||||||F',
  'OBX|3|IS|08003^Test Mode^99MRC||CBC||||||F',
  'OBX|4|IS|01002^Ref Group^99MRC||Woman||||||F',
  'OBX|5|NM|30525-0^Age^LN||18|yr|||||F',
  'OBX|6|NM|6690-2^WBC^LN||9.81|10*9/L|4.00-10.00|N|||F||E',
  'OBX|7|NM|704-7^BAS#^LN|||10*9/L|0.00-0.10||||F',
  'OBX|8|NM|706-2^BAS%^LN||||0.000-0.010||||F',
  'OBX|9|NM|751-8^NEU#^LN|||10*9/L|2.00-7.00||||F',
  'OBX|10|NM|770-8^NEU%^LN||||0.500-0.700||||F',
  'OBX|11|NM|711-2^EOS#^LN|||10*9/L|0.02-0.50||||F',
  'OBX|12|NM|713-8^EOS%^LN||||0.005-0.050||||F',
  'OBX|13|NM|731-0^LYM#^LN|||10*9/L|0.80-4.00||||F',
  'OBX|14|NM|736-9^LYM%^LN||||0.200-0.400||||F',
  'OBX|15|NM|742-7^MON#^LN|||10*9/L|0.12-0.80||||F',
  'OBX|16|NM|5905-5^MON%^LN||||0.030-0.080||||F',
  'OBX|17|NM|26477-0^*ALY#^LN|||10*9/L|0.00-0.20||||F',
  'OBX|18|NM|13046-8^*ALY%^LN||||0.000-0.020||||F',
  'OBX|19|NM|10000^*LIC#^99MRC|||10*9/L|0.00-0.20||||F',
  'OBX|20|NM|10001^*LIC%^99MRC||||0.000-0.025||||F',
  'OBX|21|NM|789-8^RBC^LN||4.53|10*12/L|3.50-5.00|N|||F',
  'OBX|22|NM|718-7^HGB^LN||65|g/L|110-150|L|||F',
  'OBX|23|NM|787-2^MCV^LN||89.5|fL|80.0-100.0|N|||F',
  'OBX|24|NM|785-6^MCH^LN||14.4|pg|27.0-31.0|L|||F',
  'OBX|25|NM|786-4^MCHC^LN||160|g/L|320-360|L|||F',
  'OBX|26|NM|788-0^RDW-CV^LN||0.133||0.115-0.145|N|||F',
  'OBX|27|NM|21000-5^RDW-SD^LN||50.9|fL|35.0-56.0|N|||F',
  'OBX|28|NM|4544-3^HCT^LN||0.405||0.370-0.480|N|||F',
  'OBX|29|NM|777-3^PLT^LN||212|10*9/L|100-300|N|||F',
  'OBX|30|NM|32623-1^MPV^LN||6.6|fL|7.0-11.0|L|||F',
  'OBX|31|NM|32207-3^PDW^LN||15.4||15.0-17.0|N|||F',
  'OBX|32|NM|10002^PCT^99MRC||1.40|mL/L|1.08-2.82|N|||F',
  'OBX|33|IS|12014^Anemia^99MRC||T||||||F',
  'OBX|34|IS|15180-3^Hypochromia^LN||T||||||F',
  'OBX|35|NM|15001^WBC Histogram. Left Line^99MRC||7||||||F',
  'OBX|36|NM|15002^WBC Histogram. Right Line^99MRC||65||||||F',
  'OBX|37|NM|15003^WBC Histogram. Middle Line^99MRC||30||||||F',
  'OBX|38|ED|15008^WBC Histogram. BMP^99MRC||^Image^BMP^Base64^ Ă Ă WBC Histogram bmp dataĂĂ||||||F',
  'OBX|39|NM|15051^RBC Histogram. Left Line^99MRC||26||||||F',
  'OBX|40|NM|15052^RBC Histogram. Right Line^99MRC||164||||||F',
  'OBX|41|ED|15056^RBC Histogram. BMP^99MRC||^Image^BMP^Base64^ Ă Ă RBC Histogram bmp dataĂĂ||||||F',
  'OBX|42|NM|15111^PLT Histogram. Left Line^99MRC||3||||||F',
  'OBX|43|NM|15112^PLT Histogram. Right Line^99MRC||43||||||F',
  'OBX|44|ED|15116^PLT Histogram. BMP^99MRC||^Image^BMP^Base64^ĂĂPLT Histogram bmp dataĂĂ||||||F',
  'OBX|45|ED|15200^WBC DIFF Scattergram. BMP^99MRC||^Image^BMP^Base64^ĂĂWBC Diff Scattergram bmp dataĂĂ||||||F',
  'OBR|2||20071207011|00002^Manual Count^99MRC|||||||||||BLDV',
  'OBX|46|NM|747-6^Myeloblasts%. Manual^LN||0.0|%|||||F',
  'OBX|47|NM|783-1^Promyelocytes%. Manual^LN||0.0|%|||||F',
  'OBX|48|NM|749-2^Myelocytes%. Manual^LN||0.0|%|||||F',
  'OBX|49|NM|740-1^Metamyelocyte%. Manual^LN||0.0|%|||||F',
  'OBX|50|NM|764-1^Neuts Band%. Manual^LN||0.0|%|||||F',
  'OBX|51|NM|769-0^Neuts Seg%. Manual^LN||0.0|%|||||F',
  'OBX|52|NM|714-6^Eosinophils%. Manual^LN||0.0|%|||||F',
  'OBX|53|NM|707-0^Basophils%. Manual^LN||0.0|%|||||F',
  'OBX|54|NM|33831-9^Lymphoblasts%. Manual^LN||0.0|%|||||F',
  'OBX|55|NM|6746-2^Prolymphocytes%. Manual^LN||0.0|%|||||F',
  'OBX|56|NM|737-7^Lymphocytes%. Manual^LN||0.0|%|||||F',
  'OBX|57|NM|29261-5^Abnormal Lymphs%. Manual^LN||0.0|%|||||F',
  'OBX|58|NM|33840-0^Monoblasts%. Manual^LN||0.0|%|||||F',
  'OBX|59|NM|13599-6^Promonocytes%. Manual^LN||0.0|%|||||F',
  'OBX|60|NM|744-3^Monocytes%. Manual^LN||0.0|%|||||F',
  'OBX|61|NM|18309-5^NRBCs%. Manual^LN||0.0|%|||||F',
  'OBX|62|NM|31112-6^Reticulocytes%. Manual^LN||0.0|%|||||F',
  'OBX|63|NM|11000^Undefined Cells%. Manual^99MRC||0.0|%|||||F',
  'OBX|64|NM|11001^Other Abnormal Cells%. Manual^99MRC||0.0|%|||||F',
].join('\r');

// const client = new Client({ host: 'sisprogweb.dynu.net' })
const client = new Client({ host: '192.168.49.1' })

const OB_ADT = client.createConnection({ port: 3500 }, async (res) => {
  const messageRes = res.getMessage()
  const check = messageRes.get('MSA.1').toString() // MSA is a Message Acknoedlgement Segment
  if (check === "AA") {
    console.log('conectado');
  } else {
    console.log('não  conectado')
  }
})

const messages = new Message({text: hl7})
messages.forEach(async (message: Message): Promise<void> => {
  await OB_ADT.sendMessage(message);
} )

// OB_ADT.addListener('')


// await OB_ADT.close();
