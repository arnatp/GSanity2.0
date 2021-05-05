package cat.institutmarianao.domain;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "doctor")
@NamedQueries({ @NamedQuery(name = "Doctor.findAll", query = "select u from Doctor u"),
		@NamedQuery(name = "Doctor.findByDni", query = "select u from Doctor u where u.dni = :dni"),
		@NamedQuery(name = "Doctor.findByMediCard", query = "select u from Doctor u where u.mediCard = :mediCard") })
public class Doctor extends Employee implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@OneToOne(mappedBy = "doctor", cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = true)
	private Visit visit;

	public Doctor() {
		// Constructor vacio para generar la tabla mediante JPA
	}

}
