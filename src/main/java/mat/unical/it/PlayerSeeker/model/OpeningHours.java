package mat.unical.it.PlayerSeeker.model;

import java.time.LocalTime;

public class OpeningHours implements java.io.Serializable {

	private static final long serialVersionUID = -7381277137796892500L;
	
	private Long id = null;
    private int day = 0;
    private LocalTime openTime = null;
    private LocalTime closeTime = null;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public LocalTime getOpenTime() {
        return openTime;
    }

    public void setOpenTime(LocalTime openTime) {
        this.openTime = openTime;
    }

    public LocalTime getCloseTime() {
        return closeTime;
    }

    public void setCloseTime(LocalTime closeTime) {
        this.closeTime = closeTime;
    }

    public OpeningHours() {}
}
