import os
import sys
import django
from django.core.management import execute_from_command_line

sys.path.insert(0, os.path.join(os.path.dirname(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'foo.settings')
django.setup()

args = sys.argv[1:]

# remove -m stuff if it's in args
try:
    idx = args.index('-m')
    args = args[idx + 2: ]
except ValueError: 
    pass

args = ['dcmio'] + args
print('calling', args)
execute_from_command_line(args)
