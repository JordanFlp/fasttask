package br.com.fasttask.fasttask.util;  // Ajuste o pacote conforme necessário

import org.mindrot.jbcrypt.BCrypt;

public class BCryptPasswordGenerator {

    public static void main(String[] args) {
        String password = "senha teste"; // Substitua pela senha que você quer gerar o hash
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
        
        System.out.println("Hash gerado: ");
        System.out.println(hashedPassword);
    }
}
