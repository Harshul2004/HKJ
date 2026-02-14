#!/usr/bin/env python3
"""
Additional Backend API Tests for Edge Cases and Error Handling
"""

import requests
import json

# Get backend URL from frontend environment
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading backend URL: {e}")
        return None

BASE_URL = get_backend_url()

def test_contact_validation():
    """Test contact form validation with invalid data"""
    print("\n🔍 Testing Contact Form Validation...")
    
    # Test missing required fields
    invalid_contacts = [
        {},  # Empty
        {"name": "John"},  # Missing email and message
        {"email": "john@example.com"},  # Missing name and message
        {"message": "Hello"},  # Missing name and email
        {"name": "", "email": "john@example.com", "message": "Hello"},  # Empty name
        {"name": "John", "email": "", "message": "Hello"},  # Empty email
        {"name": "John", "email": "john@example.com", "message": ""},  # Empty message
    ]
    
    for i, invalid_contact in enumerate(invalid_contacts):
        try:
            response = requests.post(
                f"{BASE_URL}/api/contact",
                json=invalid_contact,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            print(f"Test {i+1}: Status {response.status_code} for {invalid_contact}")
            
            # We expect validation errors (422) for invalid data
            if response.status_code == 422:
                print(f"   ✅ Correctly rejected invalid data")
            elif response.status_code == 200:
                print(f"   ⚠️  Accepted potentially invalid data")
            else:
                print(f"   ❓ Unexpected status code: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            print(f"   ❌ Request failed: {e}")

def test_malformed_requests():
    """Test malformed JSON requests"""
    print("\n🔍 Testing Malformed Requests...")
    
    try:
        # Test invalid JSON
        response = requests.post(
            f"{BASE_URL}/api/contact",
            data="invalid json",
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"Invalid JSON: Status {response.status_code}")
        
        # Test wrong content type
        response2 = requests.post(
            f"{BASE_URL}/api/contact",
            data="name=John&email=john@example.com&message=Hello",
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            timeout=10
        )
        
        print(f"Wrong content type: Status {response2.status_code}")
        
    except requests.exceptions.RequestException as e:
        print(f"❌ Malformed request test failed: {e}")

def main():
    """Run additional edge case tests"""
    print("🔍 Running Additional Backend API Edge Case Tests")
    print("=" * 50)
    
    test_contact_validation()
    test_malformed_requests()
    
    print("\n✅ Edge case testing completed")

if __name__ == "__main__":
    main()