package cat.institutmarianao.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "nurse")
public class Nurse extends Employee implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public Nurse() {
		// Constructor vacio para poder crear la tabla mediante JPA
	}

}
