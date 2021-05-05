package cat.institutmarianao.domain;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@MappedSuperclass
public abstract class User implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static final String DNIREGEXP = "\\d{8}[A-HJ-NP-TV-Z]";
	private static final String GENDERREGEXP = "[M,F,N]";
	private static final String EMAILREGEXP = "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$";

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int userId;

	@NotNull
	@Size(max = 9)
	@Pattern(regexp = DNIREGEXP)
	@Column(name = "dni", nullable = false, length = 9)
	private String dni;

	@NotNull
	@Size(max = 25)
	@Column(name = "name", nullable = false, length = 25)
	private String name;

	@NotNull
	@Size(max = 9)
	@Column(name = "medicard", nullable = false, length = 9)
	private String mediCard;

	@NotNull
	@Column(name = "borndate", nullable = false, columnDefinition = "DATE")
	private LocalDate bornDate;

	@NotNull
	@Size(max = 1)
	@Pattern(regexp = GENDERREGEXP)
	@Column(name = "gender", nullable = false, length = 1)
	private String gender;

	@NotNull
	@Size(max = 30)
	@Pattern(regexp = EMAILREGEXP)
	@Column(name = "email", nullable = false, length = 30)
	private String email;

	@NotNull
	@Size(max = 60)
	@Column(name = "password", nullable = false, length = 60)
	private String password;

	public User() {
		// Constructor para poder crear las tablas con JPA
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMediCard() {
		return mediCard;
	}

	public void setMediCard(String mediCard) {
		this.mediCard = mediCard;
	}

	public LocalDate getBornDate() {
		return bornDate;
	}

	public void setBornDate(LocalDate bornDate) {
		this.bornDate = bornDate;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String psswd) {
		this.password = psswd;
	}

	@Override
	public int hashCode() {
		return Objects.hash(dni);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof User)) {
			return false;
		}
		User other = (User) obj;
		return Objects.equals(dni, other.dni);
	}
}
