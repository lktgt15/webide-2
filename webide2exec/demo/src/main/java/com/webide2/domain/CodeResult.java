package com.webide2.domain;

public class CodeResult {
    private int id;
    private String input;
    private String output;

    public CodeResult(){

    }

    public CodeResult(int id, String input, String output) {
        this.id = id;
        this.input = input;
        this.output = output;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getInput() {
        return input;
    }

    public void setInput(String input) {
        this.input = input;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }
}
