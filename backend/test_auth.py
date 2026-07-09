from auth import hash_password, verify_password

password = "Rishita123"

hashed = hash_password(password)

print("Hashed:", hashed)

print(
    verify_password(password, hashed)
)
