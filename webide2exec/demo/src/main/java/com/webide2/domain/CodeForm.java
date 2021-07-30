package com.webide2.domain;

public class CodeForm {
    private String code;
    private int languageId;

    public CodeForm(){

    }

    public CodeForm(String code) {
        this.code = code;
    }

    public CodeForm(String code, int languageId) {
        this.code = code;
        this.languageId = languageId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getLanguageId() {
        return languageId;
    }

    public void setLanguageId(int languageId) {
        this.languageId = languageId;
    }
}
