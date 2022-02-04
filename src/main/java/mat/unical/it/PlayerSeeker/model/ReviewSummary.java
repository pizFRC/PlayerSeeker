package mat.unical.it.PlayerSeeker.model;

import java.util.ArrayList;

public class ReviewSummary {
private Float starsAverage;
private ArrayList<Integer>votes;
private Integer totalVotes;
public ReviewSummary() {
	votes=new ArrayList<Integer>();
	for(int i=0;i<5;i++) {
		votes.add(i,0);
	}
	totalVotes=0;
	starsAverage=0f;
}
public Float getStarsAverage() {
	return starsAverage;
}
public void setStarsAverage() {
	if(votes.isEmpty())
	this.starsAverage = (float) 0;
	
	for(int i=0;i<votes.size();i++) {
		this.starsAverage+=votes.get(i)*(i+1);
	}
	this.starsAverage/=votes.size();
	
}
public ArrayList<Integer> getVotes() {
	return votes;
}
public void setVotes(ArrayList<Review> review) {
	for(int i=0;i<review.size();i++) {
		int currentIndex=review.get(i).getStars()-1;
	
	    int actual=votes.get(currentIndex)+1;
		
		votes.set(currentIndex, actual);
		System.out.println( "stars:"+ (currentIndex+1 )+"< num: " + votes.get(currentIndex));
	}
	for(int i=0;i<this.votes.size();i++) {
	System.out.println(this.votes.get(i));
	
	}
	this.setTotalVotes(review.size());
	this.setStarsAverage();
	
}
public Integer getTotalVotes() {
	return totalVotes;
}
public void setTotalVotes(Integer totalVotes) {
	this.totalVotes = totalVotes;
}

}
