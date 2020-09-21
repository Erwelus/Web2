package Modules;

import java.util.ArrayList;
import java.util.List;

public class EntryList {
    List<Entry> entryList = new ArrayList<>();

    public List<Entry> getEntryList() {
        return entryList;
    }

    public void addEntry(Entry entry) {
        this.entryList.add(entry);
    }
}
