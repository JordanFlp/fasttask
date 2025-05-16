package br.com.fasttask.fasttask.service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.fasttask.fasttask.exception.*;
import br.com.fasttask.fasttask.model.User;
import br.com.fasttask.fasttask.repository.IUserRepository;

@Service
public class UserServiceImpl implements IUserService {

	private final IUserRepository userRepository;
	
	@Autowired
	public UserServiceImpl(IUserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Override
	public User createNewUser(User user) throws InvalidRequestException, EmailAlreadyExistsException {	
			
        if (user.getEmail() == null || user.getPassword() == null) {
            throw new InvalidRequestException("Email e senha são obrigatórios!");
        }
        
        if (userRepository.findByEmail(user.getEmail()) != null) {
        	throw new EmailAlreadyExistsException("E-mail já cadastrado!");
        }
        
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        return userRepository.save(user);       
            
	}
	
	@Override
	public User updateUser(User user) throws InvalidRequestException, UserNotFoundException, EmailAlreadyExistsException {
		if (user == null || user.getId() == null) {
			throw new InvalidRequestException("Usuário ou ID não pode ser nulo");
		}

		User existingUser = userRepository.findById(user.getId());
		if (existingUser == null) {
			throw new UserNotFoundException("Usuário não encontrado");
		}

		// Verifica email duplicado
		if (!existingUser.getEmail().equals(user.getEmail())) {
			User userWithEmail = userRepository.findByEmail(user.getEmail());
			if (userWithEmail != null && !userWithEmail.getId().equals(user.getId())) {
				throw new EmailAlreadyExistsException("Email já está em uso");
			}
			existingUser.setEmail(user.getEmail());
		}

		// Atualiza os campos
		existingUser.setName(user.getName());
		existingUser.setAddress(user.getAddress());
		existingUser.setPhone(user.getPhone());
		existingUser.setBirthdate(user.getBirthdate());
		existingUser.setPhoto(user.getPhoto());

		// Atualiza a senha: se senha nova informada, hash antes de salvar
		if (user.getPassword() != null && !user.getPassword().trim().isEmpty()) {
			String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
			existingUser.setPassword(hashedPassword);
		}
		// Se senha não foi passada, mantém a senha atual (não sobrescreve)

		return userRepository.update(existingUser);
	}

	
	@Override
	public void deleteUser(User user) throws InvalidRequestException, UserNotFoundException {
		
		if (user.getId() == null) throw new InvalidRequestException("Id do usuário é obrigatório para exclusão!");
		
		User currentUser = findUserById(user.getId());
		if (currentUser == null) throw new UserNotFoundException("Usuário não encontrado!");
		
		userRepository.delete(currentUser);
	}
	
	@Override
    public User findUserById(Integer userId) throws UserNotFoundException {
		
		User user = userRepository.findById(userId);
		
		if (user == null) throw new UserNotFoundException("Usuário não encontrado!");
		
		return user;
	}
	
	@Override
	public User findUserByEmail(String email) throws UserNotFoundException {
		
		User user = userRepository.findByEmail(email);
		
		if (user == null) throw new UserNotFoundException("Usuário não encontrado!");
		
		return user;
	}
	
		@Override
public User authenticateUser(String email, String password) throws InvalidRequestException, UserNotFoundException {
    User user = findUserByEmail(email);
    if (user == null) {
        throw new UserNotFoundException("Usuário não encontrado!");
    } 
    
    // Aqui a comparação é feita corretamente
    if (!BCrypt.checkpw(password, user.getPassword())) {
        throw new InvalidRequestException("Senha Inválida!");
    }

    return user;
}

}
