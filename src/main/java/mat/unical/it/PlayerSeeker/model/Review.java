package mat.unical.it.PlayerSeeker.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

public class Review {
	
	private Long id;
	private Player author;
	private SportsFacility sportsFacility;
	private String text;
	private LocalDate  data;
	private Integer stars;
	
public Review() {
	
}
public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public LocalDate getData() {
		return data;
	}
	public void setData(LocalDate data) {
		this.data = data;
	}
	public Integer getStars() {
		return stars;
	}
	public void setStars(Integer stars) {
		this.stars = stars;
	}
	public Player getAuthor() {
		return author;
	}
	public void setAuthor(Player author) {
		this.author = author;
	}
	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
	public SportsFacility getSportsFacility() {
		return sportsFacility;
	}
	public void setSportsFacility(SportsFacility sportsFacility) {
		this.sportsFacility = sportsFacility;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Review other = (Review) obj;
		return Objects.equals(id, other.id);
	}

}
