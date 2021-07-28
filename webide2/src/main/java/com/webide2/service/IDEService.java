package com.webide2.service;

import com.webide2.domain.CodeForm;
import com.webide2.domain.CodeResult;
import com.webide2.domain.MessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class IDEService {
    private final CodeService codeService;

    @Autowired
    public IDEService(CodeService codeService){
        this.codeService = codeService;
    }

    public CodeResult processCode(MessageDTO messageDTO) throws Exception{
        CodeForm randomCodeForm = codeService.processCode(messageDTO); // randomInputGenerator
        CodeForm codeForm = new CodeForm(messageDTO.getCode());

        CodeResult codeResult = new CodeResult();

        this.exec(randomCodeForm, codeResult, "RandomInputGen.cc");
        if(codeResult.getInput().equals("Error")) return codeResult;
        return this.exec(codeForm, codeResult, "RandomMain.cc");
    }

    private CodeResult exec(CodeForm codeForm,CodeResult codeResult,String fileName) throws IOException {
        String filepath = "classpath:static/code/" + fileName;
        File file = ResourceUtils.getFile(filepath);
        String path = file.getPath();

        String beforeCode = codeForm.getCode();
        System.out.println("code:" + codeForm.getCode());

        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(file));
        bufferedWriter.write(beforeCode);
        bufferedWriter.close();

        Runtime runtime = Runtime.getRuntime();
        Process process = null;

        StringBuilder successoutput = new StringBuilder();
        StringBuilder erroroutput = new StringBuilder();
        BufferedReader successreader = null;
        BufferedReader errorreader = null;
        String msg = "";

        boolean success = false;

        String[] array = null;

        fileName = fileName.substring(0, fileName.length() - 3);

        array = cmdStringList(new String[] {"g++ " + path + " -o " + fileName + " -O2 -Wall -lm -static -std=gnu++17"}, true);


        /*
        ====================↓ Compile =======================
         */

        try {
            process = runtime.exec(array);


            process.waitFor();

            successreader = new BufferedReader(new InputStreamReader(process.getInputStream(), "EUC-KR"));
            while ((msg = successreader.readLine()) != null) {
                successoutput.append(msg + System.getProperty("line.separator"));
            }


            errorreader = new BufferedReader(new InputStreamReader(process.getErrorStream(), "EUC-KR"));
            while ((msg = errorreader.readLine()) != null) {
                erroroutput.append(msg + System.getProperty("line.separator"));
            }


            if (process.exitValue() == 0) {
                System.out.println("컴파일 성공");
                System.out.println(successoutput.toString());
                success = true;
            } else {
                System.out.println("cmd 비정상 종료");
                System.out.println(successoutput.toString());
            }

            if (!(erroroutput.toString().isEmpty())) {
                System.out.println("Error");
                System.out.println(erroroutput.toString());
                int idx = erroroutput.toString().indexOf(".cc:");
                codeResult.setOutput(erroroutput.toString().substring(idx));
            }

        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                process.destroy();
                if (successreader != null) successreader.close();
                if (errorreader != null) errorreader.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        if (success == false) {
            codeResult.setInput("Error");
            return codeResult;
        }

        /*
        ====================↑ Compile ===================

        ====================↓ Exec ======================
         */

        System.out.println("중간 filename:" + fileName);
        if (fileName.equals("RandomMain")) {
            filepath = "webide2/build/resources/main/static/code/RandomInputGen.txt";
            System.out.println(filepath);
            array = cmdStringList(new String[] {fileName + ".exe","<",filepath}, true);
        } else {
            System.out.println("else");
            array = cmdStringList(new String[] {fileName + ".exe"}, false);
        }

        try {
            process = runtime.exec(array);


            if (!process.waitFor(4, TimeUnit.SECONDS)) {
                System.out.println("time out");
                codeResult.setInput("Error");
                process.destroy();
                System.out.println("return");
                return codeResult;
            }

            successreader = new BufferedReader(new InputStreamReader(process.getInputStream(), "EUC-KR"));
            while ((msg = successreader.readLine()) != null) {
                successoutput.append(msg + System.getProperty("line.separator"));
            }


            errorreader = new BufferedReader(new InputStreamReader(process.getErrorStream(), "EUC-KR"));
            while ((msg = errorreader.readLine()) != null) {
                erroroutput.append(msg + System.getProperty("line.separator"));
            }


            if (process.exitValue() == 0) {
                System.out.println("실행 성공");
                System.out.println(successoutput.toString());
                codeResult.setOutput(successoutput.toString());

            } else {
                System.out.println("cmd 비정상 종료");
                System.out.println(successoutput.toString());
                codeResult.setOutput(successoutput.toString());
            }

            if (!(erroroutput.toString().isEmpty())) {
                System.out.println("Error");
                System.out.println(erroroutput.toString());
                codeResult.setOutput(erroroutput.toString());
            }

        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                process.destroy();

                if (successreader != null) successreader.close();
                if (errorreader != null) errorreader.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        /*
        ==================↑ Exec =================
         */

        System.out.println("filename:" + fileName);
        if (fileName.equals("RandomInputGen")) {
            System.out.println("Randominput을 txt파일로 저장");
            filepath = "classpath:static/code/RandomInputGen.txt";
            file = ResourceUtils.getFile(filepath);

            System.out.println(codeResult.getOutput());
            bufferedWriter = new BufferedWriter(new FileWriter(file));
            bufferedWriter.write(codeResult.getOutput());
            bufferedWriter.close();

            codeResult.setInput(codeResult.getOutput());
        }
        return codeResult;
    }

    private String[] cmdStringList(String[] cmdList,boolean compile){
        List<String> curCmdList = new ArrayList<String>();
        if(compile){
            curCmdList.add("cmd");
            curCmdList.add("/c");
        }
        for(String s : cmdList) curCmdList.add(s);

        return curCmdList.toArray(new String[curCmdList.size()]);
    }
}
