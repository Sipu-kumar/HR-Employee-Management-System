package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "employees")
public class Employee {
	  
	  @Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
      private long id;
	  @Column(name ="first_name")
      private String firstname;
	  @Column(name ="last_name")
      private String lastname;
	  @Column(name ="email_id")
      private String emailId;

    @Column(name = "salary")
    private double salary;

    @Column(name = "mobile_number")
    private String mobileNumber;

    @Column(name = "company_name")
    private String companyName;
      
    public Employee() {
  	  
    }

    public Employee(String firstname, String lastname, String emailId, double salary, String mobileNumber, String companyName) {
		super();
		this.firstname = firstname;
		this.lastname = lastname;
		this.emailId = emailId;
        this.salary = salary;
        this.mobileNumber = mobileNumber;
        this.companyName = companyName;
	 }
	 public long getId() {
		 return id;
	  }
	  public void setId(long id) {
		 this.id = id;
	  }
	  public String getFirstname() {
		 return firstname;
	  }
	  public void setFirstname(String firstname) {
		 this.firstname = firstname;
	  }
	  public String getLastname() {
		 return lastname;
	  }
	  public void setLastname(String lastname) {
		 this.lastname = lastname;
	  }
	  public String getEmailId() {
		 return emailId;
	  }
	  public void setEmailId(String emailId) {
		 this.emailId = emailId;
	  }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
}
