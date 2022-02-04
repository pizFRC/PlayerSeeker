package mat.unical.it.PlayerSeeker.model;

import java.time.LocalDateTime;
import java.util.Objects;

public class Review {
	private Long id;
	private Player author;
	private String text;
	private LocalDateTime dataOra;
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
	public LocalDateTime getDataOra() {
		return dataOra;
	}
	public void setDataOra(LocalDateTime dataOra) {
		this.dataOra = dataOra;
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
