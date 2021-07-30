package com.webide2.domain;

public class Rule {
    private int type;
    private int rangeBegin;
    private int rangeEnd;
    private int valueBegin;
    private int valueEnd;

    public Rule() {
    }

    public Rule(int type, int rangeBegin, int rangeEnd, int valueBegin, int valueEnd) {
        this.type = type;
        this.rangeBegin = rangeBegin;
        this.rangeEnd = rangeEnd;
        this.valueBegin = valueBegin;
        this.valueEnd = valueEnd;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getRangeBegin() {
        return rangeBegin;
    }

    public void setRangeBegin(int rangeBegin) {
        this.rangeBegin = rangeBegin;
    }

    public int getRangeEnd() {
        return rangeEnd;
    }

    public void setRangeEnd(int rangeEnd) {
        this.rangeEnd = rangeEnd;
    }

    public int getValueBegin() {
        return valueBegin;
    }

    public void setValueBegin(int valueBegin) {
        this.valueBegin = valueBegin;
    }

    public int getValueEnd() {
        return valueEnd;
    }

    public void setValueEnd(int valueEnd) {
        this.valueEnd = valueEnd;
    }
}
