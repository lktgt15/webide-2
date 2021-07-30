package com.webide2.domain;

public class MessageDTO {
    private String code;
    private int id;
    private Rule rule;

    public MessageDTO() {
    }

    public MessageDTO(String code, int id, Rule rule) {
        this.code = code;
        this.id = id;
        this.rule = rule;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Rule getRule() {
        return rule;
    }

    public void setRule(Rule rule) {
        this.rule = rule;
    }
}
